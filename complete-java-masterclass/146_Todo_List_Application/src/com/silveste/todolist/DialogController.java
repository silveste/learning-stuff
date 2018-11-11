package com.silveste.todolist;

import com.silveste.todolist.datamodel.TodoData;
import com.silveste.todolist.datamodel.TodoItem;
import javafx.fxml.FXML;
import javafx.scene.control.DatePicker;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;

import java.time.LocalDate;

public class DialogController {
    @FXML
    private TextField shortDescriptionField;

    @FXML
    private TextArea detailsAreaField;

    @FXML
    private DatePicker deadlinePicker;

    public TodoItem processResults() {
        String shortDescription = shortDescriptionField.getText().trim();
        String details = detailsAreaField.getText().trim();
        LocalDate deadlineVal = deadlinePicker.getValue();
        TodoItem newItem = new TodoItem(shortDescription, details, deadlineVal);
        TodoData.getInstance().addTodoItem(newItem);
        return newItem;
    }
}
