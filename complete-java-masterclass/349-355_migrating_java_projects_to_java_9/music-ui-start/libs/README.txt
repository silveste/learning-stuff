This folder contains the following libraries not included in the repository
- javafx-sdk-11.0.1
- sqlite-jdbc-3.21.0.jar

To include the libraries in intelliJ: File > Project Structure > Libraries
JavaFX also might require require the following VM options (Run > Edit Configurations):
--module-path=libs/javafx-sdk-11.0.1/lib --add-modules=javafx.controls,javafx.fxml