<?php

namespace App\Http\Controllers;

use App\Enums\QuestionTypeEnum;
use App\Http\Requests\StoreSurveyAnswerRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionAnswer;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Enum;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index(Request $request)
    // {
    //     $user = $request->user();

    //     return QuestionResource::collection(
    //         Question::where('user_id', $user->id)
    //                     ->orderBy('created_at', 'desc')
    //                     ->paginate(10)
    //     );
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  */
    // public function store(StoreSurveyRequest $request)
    // {
    //     $data = $request->validated();

    //     //the saveImage function returns the survey image relative path.
    //     if (isset($data['image'])) {
    //         $relativePath = $this->saveImage($data['image']);
    //         $data['image'] = $relativePath;
    //     }

    //     $survey = Survey::create($data);

    //     // create new questions
    //     foreach ($data['questions'] as $question) {
    //         $question['survey_id'] = $survey->id;
    //         $this->createQuestion($question);
    //     }

    //     return new SurveyResource($survey);
    // }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(Survey $survey, Request $request)
    // {
    //     $user = $request->user();
    //     if ($user->id !== $survey->user_id) {
    //         return abort(403, "Unauthorized Action");
    //     }
    //     return new SurveyResource($survey);
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(UpdateSurveyRequest $request, Survey $survey)
    // {

    //     $data = $request->validated();

    //     if (isset($data['image'])) {
    //         $relativePath = $this->saveImage($data['image']);
    //         $data['image'] = $relativePath;

    //         // delete the old image if it exists
    //         if ($survey->image) {
    //             $absolutePath = public_path($survey->image);
    //             File::delete($absolutePath);
    //         }
    //     }

    //     $survey->update($data);

    //     // get the ids as a plain array of existing questions
    //     $existingIds = $survey->questions()->pluck('id')->toArray();
    //     // get the id as a plain array of new questions
    //     $newIds = Arr::pluck($data['questions'], 'id');
    //     // find questions to delete,
    //     $toDelete = array_diff($existingIds, $newIds);
    //     // find the questions to add
    //     $toAdd = array_diff($newIds, $existingIds);

    //     SurveyQuestion::destroy($toDelete);

    //     foreach ($data['questions'] as $question) {
    //         if (in_array($question['survey_id'], $toAdd)) {
    //             $question['survey_id'] = $survey->id;
    //             $this->createQuestion($question);
    //         }
    //     }

    //     // update the existing questions
    //     $questionsMap = collect($data['questions'])->keyBy('id');
    //     foreach($survey->questions  as $question) {
    //         if (isset($questionsMap[$question->id])) {
    //             $this->updateQuestion($question, $questionsMap[$question->id]);
    //         }
    //     }

    //     return new SurveyResource($survey);
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(Survey $survey, Request $request)
    // {
    //     $user = $request->user();

    //     if ($user->id !== $survey->user_id) {
    //         return abort(403, "Unauthorized action");
    //     }

    //     // if the survey is to be deleted then we start by removing alll of the questions that are corresponding to that survey.
    //     foreach($survey->questions as $question) {
    //         $question->delete();
    //     }

    //     $survey->delete();

    //     if ($survey->image) {
    //         $absolutePath = public_path($survey->image);
    //         File::delete($absolutePath);
    //     }

    //     return response('', 204);
    // }

    // private function saveImage($image) {
    //     // check if the image is a valid base 64 string.
    //     if (preg_match('/^data:image\/(\w+);base64,/', $image, $type )) {
    //         // Take out the base 64 encoded text without mime type
    //         $image = substr($image, strpos($image, ',') + 1);
    //         // get the file extension
    //         $type = strtolower($type[1]);

    //         // check if the file is an image
    //         if (!in_array($type, ['jpg', 'jpeg', 'png', 'gif'])) {
    //             throw new \Exception('invalid image type');
    //         }
    //         $image = str_replace(' ', '+', $image);
    //         $image = base64_decode($image);

    //         if ($image === false) {
    //             throw new \Exception("base 64 decode failed");
    //         }
    //     } else {
    //         throw new \Exception("did not match the data url with the image data");
    //     }

    //     $dir = 'images/';
    //     $file = Str::random() . '.'. $type;
    //     $absolutePath = public_path($dir);
    //     $relativePath = $dir . $file;
    //     if (!File::exists($absolutePath)) {
    //         File::makeDirectory($absolutePath, 0755, true);
    //     }
    //     file_put_contents($relativePath, $image);

    //     return $relativePath;
    // }

    // private function createQuestion($data) {
    //     if (is_array($data['data'])) {
    //         $data['data'] = json_encode($data['data']);
    //     }

    //     $validator = Validator::make($data, [
    //         'question' => 'required|string',
    //         'type' => ['required' ],
    //         'description' => 'nullable|string',
    //         'data' => 'present',
    //         'survey_id' => 'exists:App\Models\Survey,id',
    //     ]);

    //     return SurveyQuestion::create($validator->validated());
    // }

    // private function updateQuestion(SurveyQuestion $question, $data) {
    //     if (is_array($data['data'])) {
    //         $data['data'] = json_encode($data['data']);
    //     }

    //     $validator = Validator::make($data, [
    //         'id' => 'exists:App\Models\SurveyQuestion,id',
    //         'question' => 'required|string',
    //         'type' => [
    //             'required',
    //             new Enum(QuestionTypeEnum::class),
    //         ],
    //         'description' => 'nullable|string',
    //         'data' => 'present',
    //     ]);

    //     return $question->update($validator->validated());
    // }

    // public function getBySlug(Survey $survey) {
    //     if (!$survey->status) {
    //         return response('This Survey is not public', 404);
    //     }

    //     $currentDate = new \DateTime();
    //     $expireDate = new \DateTime($survey->expire_date);

    //     if ($currentDate > $expireDate) {
    //         return response('survey expired', 404);
    //     }

    //     return new SurveyResource($survey);
    // }

    // public function storeAnswer(StoreSurveyAnswerRequest $request, Survey $survey) {
    //     //validated means that it took the array called answers.
    //     $validated = $request->validated();

    //     // this means that every question that is submitted has a start and end_date
    //     $surveyAnswer = SurveyAnswer::create([
    //         'survey_id' => $survey->id,
    //         'start_date' => date('Y-m-d H:i:s'),
    //         'end_date' => date('Y-m-d H:i:s')
    //     ]);

    //     foreach ($validated['answers'] as $questionId => $answer) {
    //         $question = SurveyQuestion::where(['id' => $questionId, 'survey_id' => $survey->id])->get();

    //         if (!$question) {
    //             return response("Invalid Questionj ID: \"$questionId\"", 400);
    //         }

    //         // all of the answers are stored as arrays.
    //         $data = [
    //             'survey_question_id' => $questionId,
    //             'survey_answer_id' => $surveyAnswer->id,
    //             'answer' => is_array($answer) ? json_encode($answer) : $answer,
    //         ];

    //         $questionAnswer = SurveyQuestionAnswer::create($data);
    //     }

    //     return response("", 201);
    // }
}
