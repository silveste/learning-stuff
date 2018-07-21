package org.silveste;

public class BankAccount {
    private double balance;
    private String accountNumber;

    public BankAccount(String accountNumber, double initialBalance){
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    //color parameter is for testing purposes. will print different colors in the console depending on the thread
    public synchronized void deposit(double amount, String color){
        balance +=amount;
        System.out.println(color + "Deposit: " + amount + " New Balance: " + balance );
    }

    //color parameter is for testing purposes. will print different colors in the console depending on the thread
    public synchronized void withdraw(double amount, String color){
        balance -= amount;
        System.out.println(color + "Withdraw: " + amount + " New Balance: " + balance );
    }
}
