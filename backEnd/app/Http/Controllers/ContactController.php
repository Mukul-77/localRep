<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request) {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:contacts',
            'number' => 'required|string|max:20',
            'address' => 'required|string',
            'image' => 'nullable|image',
            'status' => 'required|in:active,inactive'
        ]);

        if($request->hasFile('imageFile')){
            $data['imageFile'] = $request->file('imageFile')->store('contact','public'); 
        }
        return Contact::create($data);
    }
}
