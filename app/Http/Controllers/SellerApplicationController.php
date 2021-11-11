<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSellerFormRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class SellerApplicationController extends Controller
{
    /**
     * @param \App\Http\Requests\StoreSellerFormRequest $request
     */
    public function store(StoreSellerFormRequest $request)
    {
        $user = (new User())->fill($request->all());
        $user->save();
        return new JsonResponse($user);
    }
}
