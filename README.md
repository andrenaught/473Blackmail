# 473Blackmail


Adding in the database ( can't find a cleaner way of doing this sorry D: ), should only need to do this initially

1. move the 'backend' folder out
```
mv 473Blackmail/backend/ .
```

2. create your own dpd
```
cd 473Blackmail
dpd create backend
```

3. Copy in the files from the 'backend' folder you moved out to your newly created 'backend' folder with dpd (this should include the .gitignore file)
```
cp -r ../backend/ backend/
```

4. Delete the 'backend' folder you moved out
```
rm -r ../backend/
```

Potential extra Features/Ideas (feel free to add stuff or start working on these, let us know if you are)
1. Countdown Timer, do something when it ends (maybe make it public to everyone in the site)
2. Stats page, showing top blackmailers, most often target, etc.
