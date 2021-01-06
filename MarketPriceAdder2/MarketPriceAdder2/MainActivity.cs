using System;
using System.Collections.Generic;
using System.Linq;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Support.Design.Widget;
using Android.Support.V7.App;
using Android.Views;
using Android.Widget;

namespace MarketPriceAdder2
{
    [Activity(Label = "@string/app_name", Theme = "@style/AppTheme.NoActionBar", MainLauncher = true)]
    public class MainActivity : AppCompatActivity
    {
        private const int noItem = -1;
        private int deletePosition = noItem;
        static List<Item> mlItems = new List<Item>();
        private ListView listView;
        Button deleteButton;
        Button calculateButton;
        Button addItemButton;
        TextView sumTextView;
        ListViewAdapter adapter;
       
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.activity_main);       
            listView = FindViewById<ListView>(Resource.Id.listView);
            adapter = new ListViewAdapter(this, mlItems);
            listView.Adapter = adapter;
            listView.ItemLongClick += ShowDeleteButton;
            RunOnUiThread(() => { adapter.NotifyDataSetChanged(); });
            calculateButton = FindViewById<Button>(Resource.Id.calculateButton);
            calculateButton.Click += OnCalculateButtonClick;
            addItemButton = FindViewById<Button>(Resource.Id.addItemButton);
            addItemButton.Click += OnAddItemButtonClick;
            sumTextView = FindViewById<TextView>(Resource.Id.sumTextView);
            deleteButton = FindViewById<Button>(Resource.Id.deleteButton);
            deleteButton.Click += OnDeleteButtonClick;
        }

        void ShowDeleteButton(object sender, AdapterView.ItemLongClickEventArgs e)
        {
            deletePosition = e.Position;
            deleteButton.Visibility = ViewStates.Visible;
        }

        void OnDeleteButtonClick(object sender, EventArgs e)
        {
            mlItems.RemoveAt(deletePosition);
            deletePosition = noItem;
            RunOnUiThread(() => { adapter.NotifyDataSetChanged(); });
            deleteButton.Visibility = ViewStates.Gone;
        }

        private void OnAddItemButtonClick(object sender, EventArgs e)
        {
            Intent intent = new Intent(this, typeof(AddItemActivity));
            StartActivity(intent);
        }

        private void OnCalculateButtonClick(object sender, EventArgs e)
        {
            int sum = 0;
            foreach (string price in mlItems.Select(x => x.Price))
            {
                int x = int.Parse(price);
                sum += x;
            }
            sumTextView.Text = "Total: " + sum.ToString();
        }

        public override bool OnCreateOptionsMenu(IMenu menu)
        {
            MenuInflater.Inflate(Resource.Menu.menu_main, menu);
            return true;
        }

        public override bool OnOptionsItemSelected(IMenuItem item)
        {
            int id = item.ItemId;
            if (id == Resource.Id.action_settings)
            {
                return true;
            }
            return base.OnOptionsItemSelected(item);
        }

        public static void AddListItem(Item item)
        {
            mlItems.Add(item);
        }

        public static void RemoveListItem(Item item)
        {
            throw new NotImplementedException();
        }
	}
}

