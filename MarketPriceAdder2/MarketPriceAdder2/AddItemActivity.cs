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

namespace MarketPriceAdder2
{
    [Activity(Label = "AddItemActivity")]
    public class AddItemActivity : Activity
    {
        EditText addNameEditText;
        EditText addPriceEditText;
        Button addItemButton;

        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.AddItem);
            addNameEditText = FindViewById<EditText>(Resource.Id.addNameEditText);
            addPriceEditText = FindViewById<EditText>(Resource.Id.addPriceEditText);
            addItemButton = FindViewById<Button>(Resource.Id.addItemButton);
            addItemButton.Click += AddItemToList;
        }

        void AddItemToList(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(addNameEditText.Text) && !string.IsNullOrEmpty(addPriceEditText.Text))
            {
                Item item = new Item()
                {
                    Name = addNameEditText.Text,
                    Price = addPriceEditText.Text
                };
                MainActivity.AddListItem(item);
                Intent intent = new Intent(this, typeof(MainActivity));
                StartActivity(intent);
            }
            else
            {
                ShowErrorDialog();
            }
        }
        private void ShowErrorDialog()
        {
            Android.App.AlertDialog.Builder builder = new Android.App.AlertDialog.Builder(this);
            builder.SetTitle("Error:");
            builder.SetMessage("Incorrectly formatted entry");
            builder.SetNeutralButton("Continue", DialogButton_Click);
            Android.App.AlertDialog dialog = builder.Create();
            dialog.Show();
        }
        void DialogButton_Click(object sender, EventArgs e)
        {
            return;
        }
    }
}