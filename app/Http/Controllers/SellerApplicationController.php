<?php

namespace App\Http\Controllers;

use App\Http\Requests\SavePoleRequest;
use App\Http\Requests\StoreSellerFormRequest;
use App\Models\Option;
use App\Models\Pole;
use App\Models\PoleAnswer;
use App\Models\Question;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class SellerApplicationController extends Controller
{
    /**
     * @param \App\Http\Requests\StoreSellerFormRequest $request
     */
    public function store(StoreSellerFormRequest $request)
    {
        $user = (new User());
        $user->fill($request->all());
        $user->uuid = Str::uuid();
        $user->save();
        return new JsonResponse($user);
    }

    public function savePole(SavePoleRequest $request)
    {
        $user = User::where('uuid', $request->user)->firstOrFail();
        $pole = Pole::where('uuid', $request->pole)->firstOrFail();

        foreach ($request->questions as $questionUuid => $optionUuid) {
            $question = Question::where('uuid', $questionUuid)->firstOrFail();
            $option = Option::where('uuid', $optionUuid)->firstOrFail();

            (new PoleAnswer([
                'user_id' => $user->id,
                'question_id' => $question->id,
                'pole_id' => $pole->id,
                'option_id' => $option->id,
            ]))->save();
        }

        return new JsonResponse($request);
    }

    public function pole(Pole $pole)
    {
        $pole->questions;

        $pole->questions->map(function (Question $question) {
            $question->options->map(function(Option $option) {
                return $option;
            });
            return $question;
        });

        return $pole;
    }
}
