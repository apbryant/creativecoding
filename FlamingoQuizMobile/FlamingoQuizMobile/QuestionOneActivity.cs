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
    [Activity(Label = "Question One")]
    public class QuestionOneActivity : Activity
    {
        Button button1;
        Button button2;
        Button button3;
        Button button4;
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.QuestionOne);

            button1 = FindViewById<Button>(Resource.Id.button1);
            button2 = FindViewById<Button>(Resource.Id.button2);
            button3 = FindViewById<Button>(Resource.Id.button3);
            button4 = FindViewById<Button>(Resource.Id.button4);

            button1.Click += OptionButton_Click;
            button2.Click += OptionButton_Click;
            button3.Click += OptionButton_Click;
            button4.Click += OptionButton_Click;
        }
        
        void OptionButton_Click(Object sender, EventArgs e)
        {
            Button correctButton = button1;      
            Button b = sender as Button;
            string message = Grader.Grade(correctButton, b);
            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.SetTitle("Your Answer Is:");
            builder.SetMessage(message);
            builder.SetNeutralButton("Continue", DialogButton_Click);
            AlertDialog dialog = builder.Create();
            dialog.Show();          
        }

        void DialogButton_Click(object sender, EventArgs e)
        {
            Intent intent = new Intent(this, typeof(QuestionTwoActivity));
            StartActivity(intent);
        }
    }
}