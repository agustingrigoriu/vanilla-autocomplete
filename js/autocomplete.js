/*
  Módulo Autocomplete
*/

(function (Autocomplete) {

    var items_list = [];

    var clearItemList = function () {
        document.getElementById("items-list").innerHTML = "";
    }

    var saveItemListValues = function () {
        var item_list_values = document.getElementById("item-list-values");

        item_list_values.value = getItemListValues();
    }

    var getItemListValues = function () {
        return items_list.map((item) => {
            return item.value;
        })
    }

    var renderItemList = function () {

        clearItemList();

        var list_element = document.getElementById("items-list");
        items_list.forEach(item => {
            var item_element = document.createElement("LI"),
                remove_element = document.createElement("SPAN");

            remove_element.className = "remove-item";
            remove_element.innerHTML = " x";

            item_element.value = item.value;
            item_element.innerHTML = item.text;

            item_element.appendChild(remove_element);

            remove_element.addEventListener("click", function (e) {
                list_element.removeChild(item_element);
                removeItemFromList(item);
            });

            list_element.appendChild(item_element);
        });

        saveItemListValues();
    }

    var getItemList = function () {
        return items_list;
    }

    var addItemToList = function (item) {
        !listContainsItem(item) && items_list.push(item);
    }

    var removeItemFromList = function (item) {
        items_list = items_list.filter(i => i.value !== item.value)
    }

    var listContainsItem = function (item) {
        return items_list.filter(i => i.value === item.value).length > 0;
    }

    var init = function (inp, arr) {

        //Creating the items-list
        var autocomplete_element = document.getElementById("autocomplete"),
            hidden_element = document.createElement("INPUT"),
            items_list_element = document.createElement("UL");

        items_list_element.className = "items-list";
        items_list_element.id = "items-list";

        /*create a HIDDEN INPUT element that will contain the array of values:*/
        hidden_element.hidden = true;
        hidden_element.id = "item-list-values";

        autocomplete_element.insertAdjacentElement("beforeend", items_list_element);
        autocomplete_element.appendChild(hidden_element);

        /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function (e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");

            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
                var item = arr[i],
                    description = item && item.text,
                    desc_substr = description && description.substr(0, val.length),
                    desc_substr_rest = description && description.substr(val.length);
                /*check if the item starts with the same letters as the text field value:*/
                if (desc_substr.toUpperCase() == val.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + desc_substr + "</strong>";
                    b.innerHTML += desc_substr_rest;
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += `<input type='hidden' value='${item.value}_${item.text}'>`;
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function (e) {
                        /*insert the value for the autocomplete text field:*/
                        var hidden_input = this.getElementsByTagName("input")[0],
                            data = hidden_input && hidden_input.value && hidden_input.value.split('_'),
                            selectedValue = data && data[0],
                            selectedText = data && data[1];

                        inp.value = "";
                        //Adding item to a list
                        var item = {
                            value: selectedValue,
                            text: selectedText
                        };
                        addItemToList(item);

                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                        renderItemList();
                    });
                    a.appendChild(b);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function (e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
            }
        });
        function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }
        function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }

    Autocomplete.init = function (anInput, anAjaxUrl) {

        fetch(anAjaxUrl)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        init(anInput, data);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :', err);
            });

    };

})(window.Autocomplete = window.Autocomplete || {});
