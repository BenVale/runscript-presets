var document = app.open(new File(app.scriptArgs.get('input')));

app.importFile(ExportPresetFormat.PDF_EXPORT_PRESETS_FORMAT, new File(app.scriptArgs.get('preset_filename')));
// var preset = app.pdfExportPresets.item('[High Quality Print]');
var preset = app.pdfExportPresets.item(app.scriptArgs.get('preset_name'));

app.findGrepPreferences = app.findChangeGrepOptions = null;
app.findGrepPreferences.findWhat = '<<.+?>>';

var fields = document.findGrep();
for (var i = fields.length - 1; i >= 0; i--) {
  var field = fields[i].contents.replace(/^<</, '').replace(/>>$/, '');
  if(app.scriptArgs.isDefined(field) == true){
    fields[i].contents = app.scriptArgs.getValue(field);
  }
}

document.exportFile(ExportFormat.PDF_TYPE, new File(app.scriptArgs.get('output')), preset);
