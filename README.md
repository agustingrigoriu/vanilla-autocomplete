# vanilla-autocomplete
Vanilla JS Autocomplete Input


## How to use it
To use you need to call the autocomplete function like this:
```
Autocomplete.init(document.getElementById("myInput"), './ajax/data.php');
```
Where the first parameter is the input you will be initializing as an autocomplete input. And the second parameter is the URL containing the data, which is an array of objects that must have the following format:
```
[
    {
      "value": 222,
      "text": "Lang"
    },
    {
      "value": 844,
      "text": "Fisher"
    }
]
```
