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
using Java.Lang;

namespace FlamingoQuizMobile
{
    [Activity(Label = "Flamingo Quiz Mobile", MainLauncher = true)]
    public class SplashActivity : Activity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.Splash);
            // Create your application here
            RunOnUiThread(() =>
            {
                var h = new Handler();
                h.PostDelayed(new Runnable(() =>
                {
                    Intent intent = new Intent(this, typeof(MainActivity));
                    StartActivity(intent);
                }), 3000);
            });
        }
    }
}