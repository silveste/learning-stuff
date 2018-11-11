module com.silveste.ui {
    //requires javafx.graphics; // javafx.graphics are transitive in javafx.controls
    requires javafx.fxml;
    requires javafx.controls;
    requires com.silveste.db;
    //requires com.silveste.common; Not required anymore as has been declared as transitive in com.silveste.db,
    //this module only uses methods from com.silveste.common to satisfy types and methods returned by com.silveste.db

    exports com.silveste.ui to javafx.graphics, javafx.fxml;

    opens com.silveste.ui to javafx.fxml;
}