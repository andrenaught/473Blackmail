# 473Blackmail


Adding in the database ( can't find a cleaner way of doing this sorry D: ), should only need to do this initially

1. move the '473' outside the current directory
```
mv 473Blackmail/ ../
```

2. create your own dpd
```
dpd create 473Blackmail
```

3. Copy in the files from the '473' folder you moved out to your newly created dpd '473' folder (this should include the .gitignore file)
```
cp -r ../473Blackmail/ 473Blackmail/
```

4. Delete the '473' folder you moved out
```
rm -r ../473Blackmail/
```

Potential extra Features/Ideas (feel free to add stuff or start working on these, let us know if you are)
1. Countdown Timer, do something when it ends (maybe make it public to everyone in the site)
2. Stats page, showing top blackmailers, most often target, etc.
