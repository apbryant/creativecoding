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
    class ListViewAdapter : BaseAdapter<Item>
    {
        private List<Item> lvItems;
        private Context lvContext;


        public ListViewAdapter(Context content, List<Item> items)
        {
            lvItems = items;
            lvContext = content;
        }
        public override int Count
        {
            get
            {
                return lvItems.Count;
            }
        }

        public override long GetItemId(int position)
        {
            return position;
        }

        public override View GetView(int position, View convertView, ViewGroup parent)
        {
            View row = convertView;
            if (row == null)
            {
                row = LayoutInflater.From(lvContext).Inflate(Resource.Layout.MainRow, null, false);
            }
            TextView name = row.FindViewById<TextView>(Resource.Id.nameTextView);
            name.Text = lvItems[position].Name;

            TextView unitPrice = row.FindViewById<TextView>(Resource.Id.priceTextView);
            unitPrice.Text = lvItems[position].Price;

            return row;
        }

        public override Item this[int position]
        {
            get
            {
                return lvItems[position];
            }
        }
    }
}