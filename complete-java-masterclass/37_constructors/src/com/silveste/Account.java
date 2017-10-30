package com.silveste;

public class Account {
    private String number;
    private Double balance;
    private String customerName;
    private String email;
    private int phoneNumber;

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void deposit (double amount ) {
        balance += amount;
        System.out.println("Amount: " + amount);
        System.out.println("Your new balance is " + balance);
    }

    public void withdraw (double amount ) {
        if (balance >= amount) {
            balance -= amount;
            System.out.println("Amount: " + amount);
            System.out.println("Your new balance is " + balance);
        } else {
            System.out.println("Insufficient Funds");
        }

    }
}
