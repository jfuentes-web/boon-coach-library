#!/bin/bash

# Update Boon Brand Colors
sed -i '' 's/--blue: #1B4FD8;/--blue: #466FF6;/g' index.html
sed -i '' 's/--blue-dark: #1240B0;/--blue-dark: #3A57A7;/g' index.html
sed -i '' 's/--blue-light: #EEF2FF;/--blue-light: #EFF0F1;/g' index.html
sed -i '' 's/--blue-mid: #D0D9F8;/--blue-mid: #BC8EC0;/g' index.html
sed -i '' 's/--peach: #F4A47A;/--peach: #F58E83;/g' index.html
sed -i '' "s/family=DM+Sans/family=PT+Sans/g" index.html
sed -i '' "s/family=DM+Serif/family=PT+Serif/g" index.html
sed -i '' "s/'DM Sans'/'PT Sans'/g" index.html
sed -i '' "s/'DM Serif Display'/'PT Serif'/g" index.html

echo "✅ Colors and fonts updated!"
