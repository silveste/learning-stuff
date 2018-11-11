package com.silveste;

public class Contact {

    private String name;
    private String phoneNumber; //In future versions with validators thar remove spaces could be int

    public Contact(String name, String phoneNumber) {
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    public String getName() {
        return name;
    }

    public String getPhoneNumber() {

        return phoneNumber;
    }

    public boolean compare (String termToCompare){
        termToCompare = termToCompare.toLowerCase();
        if (phoneNumber.toLowerCase().contains(termToCompare)){
            return true;
        } else if (name.toLowerCase().contains(termToCompare)){
            return true;
        }
        return false;
    }

}
