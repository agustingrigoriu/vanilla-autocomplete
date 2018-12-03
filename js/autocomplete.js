
$(function () {
    var availableTags = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme"
      ];
    $("#skill_input").autocomplete({
        source: availableTags,
        select: function (event, ui) {
            event.preventDefault();
            $("#autocomplete_items").append(`<li class="ui-corner-all">${ui.item.value}</li>`);
        }
    });
});