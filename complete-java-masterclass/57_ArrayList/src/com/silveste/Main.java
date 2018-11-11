package com.silveste;

import com.sun.org.apache.xpath.internal.SourceTree;

import java.util.Scanner;

public class Main {
        private static Scanner scan = new Scanner(System.in);;
        private static MobilePhone myPhone;

    public static void main(String[] args) {
        System.out.println("Please enter your phone number:");
        String phone = scan.nextLine();
        myPhone = new MobilePhone(phone);
        mainMenu();
    }
    public static void mainMenu() {
        boolean loop = true;
        while (loop) {
            System.out.println(
                    "Please select an option:\n" +
                            "1. Add contact\n" +
                            "2. Find contact\n" +
                            "3. Show all contacts\n" +
                            "4. Exit"
            );
            int option = scan.nextInt();
            scan.nextLine();
            Contact[] contacts;
            Contact contact;
            switch (option) {
                case 1:
                    System.out.println("Enter the contact name:");
                    String contactName = scan.nextLine();
                    System.out.println("Enter the phone number");
                    String contactPhone = scan.nextLine();
                    contact = new Contact(contactName, contactPhone);
                    boolean result = myPhone.addContact(contact);
                    if (result) {
                        System.out.println(contactName + " has been added successfully");
                    } else {
                        System.out.println("The phone " + contactPhone + " already exists in your list");
                    }
                    break;
                case 2:
                    System.out.println("Enter the contact name or phone number:");
                    String searchTerm = scan.nextLine();
                    contacts = myPhone.search(searchTerm);
                    if (contacts != null && contacts.length >= 1) {
                        System.out.println("Found " + contacts.length + " matches:");
                        contactsMenu(contacts);
                    } else {
                        System.out.println(searchTerm + " doesn't match any contact");
                    }
                    break;
                case 3:
                    contacts = myPhone.listAll();
                    if (contacts != null && contacts.length >= 1) {
                        System.out.println("There are " + contacts.length + " contacts:");
                        contactsMenu(contacts);
                    } else {
                        System.out.println("The list is empty");
                    }
                    break;
                case 4:
                    System.out.println("Bye");
                    loop = false;
                    break;
            }
        }
    }

    public static void contactsMenu (Contact[] contacts){
        while(true) {
            for (int i = 0; i < contacts.length; i++) {
                System.out.print(i + 1 + ". ");
                System.out.print(contacts[i].getName() + ", ");
                System.out.println(contacts[i].getPhoneNumber());
            }
            System.out.println("Please select contact (0 to exit): ");
            int index = scan.nextInt() - 1;
            if (index == -1) {
                return;
            }
            System.out.println(
                    "Contact selected: " +
                            contacts[index].getName() + ", " + contacts[index].getPhoneNumber() + "\n" +
                            "Please select option:\n" +
                            "1. Remove contact\n" +
                            "2. Update contact\n" +
                            "3. Go back"
            );
            int option = scan.nextInt();
            scan.nextLine();
            switch (option) {
                case 1:
                    myPhone.removeContact(contacts[index]);
                    System.out.println(
                            contacts[index].getName() + " has been removed."
                    );
                    return;
                case 2:
                    System.out.println("Please enter the new name (Empty if is the same):");
                    String newName = scan.nextLine();
                    System.out.println("Please enter the new phone (Empty if is the same):");
                    String newPhone = scan.nextLine();
                    String name = (newName.isEmpty()) ? contacts[index].getName() : newName;
                    String phone = (newPhone.isEmpty()) ? contacts[index].getPhoneNumber() : newPhone;
                    myPhone.updateContact(contacts[index], new Contact(name, phone));
                    System.out.println(
                            name + " has been updated."
                    );
                    return;
                case 3:
                    break;
            }
        }
    }
}
