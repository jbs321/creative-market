<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\SellerApplicationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/save-seller-form', [SellerApplicationController::class, 'store']);
Route::post('/save-pole', [SellerApplicationController::class, 'savePole']);
Route::get('/pole/{poleName}', [SellerApplicationController::class, 'pole']);
