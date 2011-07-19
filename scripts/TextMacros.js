function Macro(expression, replacement, description) {
  this._expression = expression;
  this._replacement = replacement;
  this._description = description;
}

var macros =
  [
   new Macro(/\\\(/g, "(", "\\( -> (."),
   new Macro(/\\\{/g, "{", "\\{ -> {."),
   new Macro(/\\\[/g, "[", "\\[ -> [."),
   new Macro(/\{@/g, "\"\"", "{@ -> \"\""),
   new Macro(/{quote}/g, "{code}", "{quote} to {code}."),
   new Macro(/–/g, "�", "– -> m-dash"),
   new Macro(/""([A-Za-z]+)""/g, "{{$1}}", "Replace double quotes with double braces."),
   new Macro(/\{@([A-Za-z]+)""/g, "$1", "Fix: {@ThisIsSomeText\"\""),
   new Macro(/\{@([A-Za-z0-9]+)\{@/g, "$1", "Fix: {@BlahBlah{@"),
   new Macro(/\\\[FLEXUI\:"([a-zA-Z0-9]+)"\\\]/g, "[\"$1\"]", "Fix: \\[FLEXUI:\"startTime\"\\]"),
   new Macro(/\\\[FLEXUI\:"([a-zA-Z0-9]+)"\]/g, "[\"$1\"]", "Fix: \\[FLEXUI:\"startTime\"]")
   ];


function applyMacro(textArea, macro) {
  var newValue = textArea.val().replace(macro._expression, macro._replacement);
  textArea.val(newValue);
}


function appendMacroDetailsToList(macro, macroContainerList) {
  var li = $("<li />").text(macro._description);
  li.hover(
	   function() {
	     $(this).addClass("hover");
	   },
	   function() {
	     $(this).removeClass("hover");
	   });
  var getClickCallback = function() { 
    var thisMacro = macro;
    return function() { 
      applyMacro($("textarea#myEditor"), thisMacro);
    }
  };
  li.click(getClickCallback());
  macroContainerList.append(li);
}
