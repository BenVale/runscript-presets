# Custom PDF Preset example

Using a custom pdf preset.
* Presets need to be stored in the correct folder for InDesignServer to see them: `c:/Program Files/Adobe/Adobe InDesign CC Server 2019/Resources/Adobe PDF/settings/mul/presetname.joboptions`
* Presets need to be imported `app.importFile(ExportPresetFormat.PDF_EXPORT_PRESETS_FORMAT, File);`

## Setup
* copy files in ../data to your S3 bucket.
* set environmental variables

## Run
* node index.js