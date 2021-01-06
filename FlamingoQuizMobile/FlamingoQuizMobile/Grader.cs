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
    public static class Grader
    {
        public static Dictionary<string, int> results = new Dictionary<string, int>()
        {
            {"Correct", 0 },
            {"Incorrect", 0 }
        };

        public static double numberOfQuestions = 5;
        public static string Grade(Button correct, Button response)
        {
            string correctText = correct.Text;
            string returnMessage = null;
            if (correct.Id == response.Id)
            {
                // do something
                Grader.results["Correct"]++;
                returnMessage = "Correct!";
            }
            else
            {
                Grader.results["Incorrect"]++;
                returnMessage = string.Format("Incorrect. The correct answer is {0}", correctText);
            }
            return returnMessage;
        }

        public static bool IsScorePerfect()
        {
            bool perfect;
            double score = ((double)results["Correct"] / numberOfQuestions);
            if (score == 1)
            {
                perfect = true;
            }
            else
            {
                perfect = false;
            }
            return perfect;
        }
    }
}