package org.silveste;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class Challenge7 {


    public static void main(String[] args) {
        BankAccountv2 account1 = new BankAccountv2("12345-678", 500.00);
        BankAccountv2 account2 = new BankAccountv2("98765-432", 1000.00);

        new Thread(new Transfer(account1, account2, 10.00), "Transfer1").start();
        new Thread(new Transfer(account2, account1, 55.88), "Transfer2").start();
    }
}

class BankAccountv2 {
    private double balance;
    private String accountNumber;
    private Lock lock = new ReentrantLock();

    BankAccountv2(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public boolean withdraw(double amount) {
        if (lock.tryLock()) {
            try {
                // Simulate database access
                Thread.sleep(100);
                balance -= amount;
                System.out.printf("%s: Withdrew %f\n", Thread.currentThread().getName(), amount);
                return true;
            }
            catch (InterruptedException e) {
            } finally {
                lock.unlock();
            }

        }
        return false;
    }

    public boolean deposit(double amount) {
        if (lock.tryLock()) {
            try {
                // Simulate database access
                Thread.sleep(100);
                balance += amount;
                System.out.printf("%s: Deposited %f\n", Thread.currentThread().getName(), amount);
                return true;
            }
            catch (InterruptedException e) {
            } finally {
                lock.unlock();
            }

        }
        return false;
    }

    public boolean transfer(BankAccountv2 destinationAccount, double amount) {
        if (withdraw(amount)) {
            if (destinationAccount.deposit(amount)) {
                return true;
            }
            else {
                // The deposit failed. Refund the money back into the account.
                System.out.printf("%s: Destination account busy. Refunding money\n",
                        Thread.currentThread().getName());
                deposit(amount);
            }
        }

        return false;
    }
}

class Transfer implements Runnable {
    private BankAccountv2 sourceAccount, destinationAccount;
    private double amount;

    Transfer(BankAccountv2 sourceAccount, BankAccountv2 destinationAccount, double amount) {
        this.sourceAccount = sourceAccount;
        this.destinationAccount = destinationAccount;
        this.amount = amount;
    }

    public void run() {
        while (!sourceAccount.transfer(destinationAccount, amount))
            continue;
        System.out.printf("%s completed\n", Thread.currentThread().getName());
    }

}
