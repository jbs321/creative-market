<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInitialSchema extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('portfolio_link')->unique();
            $table->string('category');
            $table->string('store_urls')->nullable();
            $table->timestamps();
        });

        Schema::create('poles', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->string('question');
            $table->timestamps();
        });

        Schema::create('pole_questions', function (Blueprint $table) {
            $table->foreignId('pole_id')
                ->constrained('poles')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreignId('question_id')
                ->constrained('questions')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        Schema::create('options', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->string('option');
            $table->timestamps();
        });

        Schema::create('question_options', function (Blueprint $table) {
            $table->foreignId('question_id')
                ->constrained('questions')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreignId('option_id')
                ->constrained('options')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        Schema::create('pole_answers', function (Blueprint $table) {
            $definition = [
                'user_id'     => 'users',
                'pole_id'     => 'poles',
                'question_id' => 'questions',
                'option_id'   => 'options',
            ];

            /** @var \Illuminate\Database\Schema\ForeignKeyDefinition $foreginKeyDef */
            foreach ($definition as $columnName => $tableRef) {
                $table->foreignId($columnName)
                    ->constrained($tableRef)
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pole_answers', function (Blueprint $table) {
            $table->dropForeign('pole_answers_user_id_foreign');
            $table->dropForeign('pole_answers_pole_id_foreign');
            $table->dropForeign('pole_answers_question_id_foreign');
            $table->dropForeign('pole_answers_option_id_foreign');
            $table->drop();
        });

        Schema::table('question_options', function (Blueprint $table) {
            $table->dropForeign('question_options_question_id_foreign');
            $table->dropForeign('question_options_option_id_foreign');
            $table->drop();
        });

        Schema::table('pole_questions', function (Blueprint $table) {
            $table->dropForeign('pole_questions_pole_id_foreign');
            $table->dropForeign('pole_questions_question_id_foreign');
            $table->drop();
        });

        Schema::dropIfExists('options');
        Schema::dropIfExists('poles');
        Schema::dropIfExists('users');
        Schema::dropIfExists('questions');
    }
}
