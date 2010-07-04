#About

**jQuery Depeche Mode**

Allows a user to select items from a list with number keys on the keyboard 0 to 9, where 0 equals 10.

Once the line is highlighted then you can hit the following keys to click the link:
s = Show
e = Edit
d = Destroy
t = Tag

All these links must be ajax links so that the click function works.  You might want to use my jQuery.Beeline plugin.

#Requires

jquery-1.4.2

#Recommend

jquery.beeline

#Use

Add the following to your application.js
  $(document).depechemode();

Make sure the id is set on your show,edit,destroy links eg:
  <td><%= link_to "Show", product, :class => 'ajax', :target => 'content', :id => 'show' %></td>

Functions available
shotcut key = id of link
s = show
e = edit
d = destroy
t = tag
m = move