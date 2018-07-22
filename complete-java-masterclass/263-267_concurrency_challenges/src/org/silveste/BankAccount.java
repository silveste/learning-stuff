package org.silveste;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class BankAccount {
    private double balance;
    private String accountNumber;

    private Lock lock;

    public BankAccount(String accountNumber, double initialBalance){
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.lock = new ReentrantLock();
    }

    //color parameter is for testing purposes. will print different colors in the console depending on the thread
    public void deposit(double amount, String color){
        boolean status = false;
//      Challenge 5: Using trylock
        try {
            if (lock.tryLock(1000, TimeUnit.MILLISECONDS)){
                try {
                    balance +=amount;
                    System.out.println(color + "Deposit: " + amount + " New Balance: " + balance );
                    status = true;
                } finally {
                    lock.unlock();
                }
            } else {
                System.out.println("Couldn't get the lock");
            }
        } catch (InterruptedException e){
            System.out.println("ups...");
        }

        System.out.println("Transaction status: " + status);
//        Challenge 4: using reentrant lock
//        lock.lock();
//        try {
//            balance +=amount;
//            System.out.println(color + "Deposit: " + amount + " New Balance: " + balance );
//        } finally {
//            lock.unlock();
//        }
    }

    //color parameter is for testing purposes. will print different colors in the console depending on the thread
    public synchronized void withdraw(double amount, String color){
        boolean status = false;
//      Challenge 5: Using trylock
        try {
            if (lock.tryLock(1000, TimeUnit.MILLISECONDS)){
                try {
                    balance -=amount;
                    System.out.println(color + "Withdraw: " + amount + " New Balance: " + balance );
                    status = true;
                } finally {
                    lock.unlock();
                }
            } else {
                System.out.println("Couldn't get the lock");
            }
        } catch (InterruptedException e){
            System.out.println("ups...");
        }
        System.out.println("Transaction status: " + status);
//        Challenge 4: using reentrant lock
//        lock.lock();
//        try {
//            balance -= amount;
//            System.out.println(color + "Withdraw: " + amount + " New Balance: " + balance );
//        } finally {
//            lock.unlock();
//        }
    }
}
