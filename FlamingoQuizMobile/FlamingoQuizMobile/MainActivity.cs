using System;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Support.Design.Widget;
using Android.Support.V7.App;
using Android.Views;
using Android.Widget;

namespace FlamingoQuizMobile
{
    [Activity(Label = "@string/app_name", Theme = "@style/AppTheme.NoActionBar")]
    public class MainActivity : Activity
    {
        Button startQuizButton;
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);
            SetContentView(Resource.Layout.activity_main);
            startQuizButton = FindViewById<Button>(Resource.Id.startQuizButton);
            startQuizButton.Click += OnStartClick;
        }

        void OnStartClick(object sender, EventArgs e)
        {
            //go to question one
            Intent intent = new Intent(this, typeof(QuestionOneActivity));
            StartActivity(intent);
        }
	}
}

