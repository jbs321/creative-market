<?php

namespace Database\Seeders;

use App\Models\Option;
use App\Models\Pole;
use App\Models\PoleQuestion;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PoleSeeder extends Seeder
{
    const QUESTION1 = "when creating products to sell, which best describes your perspective on quality?";
    const QUESTION2 = "How would you describe your experience level as an online seller?";
    const QUESTION3 = "How would you describe your understanding of business and marketing?";

    const OPTIONS = [
        self::QUESTION1 => [
            "don't care what it takes, my products are the highest quality possible",
            "put in enough effort to make my product pretty high quality, but at some point my time is better spent elsewhere",
            "try to get quality products out quickly, even if need to take a shortcut now and then",
            "spend the minimum amount of time & effort it takes to create products that are acceptable quality.",
            "Quantity is more important to me than quality.",
        ],
        self::QUESTION2 => [
            "sell on multiple marketplaces and through my own website",
            "have experience selling through only my own website",
            "have experience selling through multiple marketplaces",
            "have experience selling through one online marketplace",
            "I'm new to selling creative products online",
        ],
        self::QUESTION3 => [
            "I have an extensive background in business and/or marketing",
            "I'm familiar with some skills & techniques, but I’m not sure how to apply them when selling my creative work",
            "I'm vaguely aware of basic business & marketing concepts",
            "I'm not interested in understanding business & marketing",
        ],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $newPole = new Pole(['name' => 'Seller Form', 'uuid' => Str::uuid()]);
        $newPole->save();

        foreach (self::OPTIONS as $question => $options) {
            $newQuestion = new Question(compact('question'));
            $newQuestion->uuid = Str::uuid();
            $newQuestion->save();

            (new PoleQuestion(['pole_id' => $newPole->id, 'question_id' => $newQuestion->id]))->save();

            foreach ($options as $option) {
                $newOption = new Option(['option' => $option]);
                $newOption->uuid = Str::uuid();
                $newOption->save();

                (new QuestionOption([
                    'option_id' => $newOption->id,
                    'question_id' => $newQuestion->id,
                ]))->save();
            }
        }


    }
}
