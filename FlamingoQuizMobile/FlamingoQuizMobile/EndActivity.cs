using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;

namespace FlamingoQuizMobile
{
    [Activity(Label = "EndActivity")]
    public class EndActivity : Activity
    {
        TextView results;
        protected override void OnCreate(Bundle savedInstanceState)
        {           
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.End);
            results = FindViewById<TextView>(Resource.Id.results);
            int correct = Grader.results["Correct"];
            int incorrect = Grader.results["Incorrect"];
            int total = correct + incorrect;
            string message = string.Format("You answered {0} out of {1} questions correctly", correct, total);
            results.Text = message;
        }
    }
}