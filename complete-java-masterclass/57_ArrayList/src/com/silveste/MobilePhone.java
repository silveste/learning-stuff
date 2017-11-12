package com.silveste;

import java.util.ArrayList;
import java.util.Iterator;

public class MobilePhone {

    private String myPhoneNumber;
    private ArrayList<Contact> contactList;

    public MobilePhone(String myPhoneNumber) {
        this.myPhoneNumber = myPhoneNumber;
        this.contactList = new ArrayList<>();
    }

    public boolean addContact(Contact contact) {
        if (findContact(contact.getPhoneNumber()) >= 0){
            return false;
        }
        this.contactList.add(contact);
        return true;
    }

    public boolean removeContact(Contact contact){
        int index = findContact(contact.getPhoneNumber());
        if (index >= 0){
            this.contactList.remove(index);
            return true;
        }
        return false;
    }

    public boolean updateContact(Contact oldContact, Contact newContact){
        int index =findContact(oldContact.getPhoneNumber());
        if (index >= 0){
            this.contactList.set(index, newContact);
            return true;
        }
        return false;
    }

    public Contact[] search(String searchTerm){
        ArrayList<Contact> matches = new ArrayList<>();
        int index = -1;
        while (true) {
            index = findContact(searchTerm, index + 1 );
            if (index == -1) {
                break;
            }
            matches.add(this.contactList.get(index));
        }
        if (matches.isEmpty()){return null;}
        return matches.toArray(new Contact[matches.size()]);
    }

    public Contact[] listAll(){
        if (this.contactList.isEmpty()){return null;}
        return this.contactList.toArray(new Contact[contactList.size()]);
    }

    private int findContact(String searchTerm){
        return findContact(searchTerm, 0);
    }

    private int findContact(String searchTerm, int startIndex){
        for (int i = startIndex; i < this.contactList.size(); i++) {
            Contact contact = this.contactList.get(i);
            if (contact.compare(searchTerm)){
                return i;
            }
        }
        return -1;
    }

}
