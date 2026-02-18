<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Division;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index()
    {
        return response()->json(Division::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:divisions,name',
        ]);

        $division = Division::create($validated);

        return response()->json([
            'message' => 'Department created successfully',
            'data' => $division
        ], 201);
    }

    public function show($id)
    {
        return response()->json(Division::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $division = Division::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:divisions,name,' . $division->id,
        ]);

        $division->update($validated);

        return response()->json([
            'message' => 'Department updated successfully',
            'data' => $division
        ]);
    }

    public function destroy($id)
    {
        $division = Division::findOrFail($id);
        $division->delete();

        return response()->json([
            'message' => 'Department deleted successfully'
        ]);
    }
}
