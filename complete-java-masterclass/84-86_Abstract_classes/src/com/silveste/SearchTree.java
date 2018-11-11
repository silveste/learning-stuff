package com.silveste;

public class SearchTree implements NodeList {
    private ListItem root = null;

    public SearchTree(ListItem root) {
        this.root = root;
    }

    @Override
    public ListItem getRoot() {
        return this.root;
    }

    @Override
    public boolean addItem(ListItem item) {
        if(this.root == null){
            this.root = item;
            return true;
        }
        ListItem currentItem = this.root;
        while (currentItem != null){
            int comp = (currentItem.compareTo(item));
            if(comp < 0){
                if(currentItem.next() != null){
                    currentItem = currentItem.next();
                } else {
                    currentItem.setNext(item);//Remember setItem returns the item so we can setPrevious after that
                    return true;
                }
            } else if (comp > 0){
                if(currentItem.prev() != null){
                    currentItem = currentItem.prev();
                } else {
                    currentItem.setPrev(item);
                    return true;
                }
            } else {
                System.out.println(item.getValue() + " is already in the list");
                return false;
            }
        }
        return false;
    }

    @Override
    public boolean removeItem(ListItem item) {
        if (item != null){
            System.out.println("Deleting item " + item.getValue());
        }
        ListItem currentItem = this.root;
        ListItem parentItem = currentItem;
        while (currentItem != null){
            int comp = currentItem.compareTo(item);
            if (comp < 0){
               parentItem = currentItem;
               currentItem = currentItem.next();
            } else if (comp > 0) {
                parentItem = currentItem;
                currentItem = currentItem.prev();
            } else {
                //Item found
                performRemoval(currentItem, parentItem);
                return true;
            }
        }
        return false;
    }

    private void performRemoval(ListItem item, ListItem parent){
        //Remove item from the tree
        if(item.next() == null){
            if(parent.next() == item){
                parent.setNext(item.prev());
            } else if (parent.prev() == item){
                parent.setPrev(item.prev());
            } else {
                //Case when item is root
                this.root = item.prev();
            }
        } else if (item.prev() == null){
            if(parent.next() == item){
                parent.setNext(item.next());
            } else if (parent.prev() == item){
                parent.setPrev(item.next());
            } else {
                //Case when item is root
                this.root = item.next();
            }
        } else {
            ListItem current = item.next();
            ListItem leftmostParent = item;
            while(current.prev() != null){
                leftmostParent = current;
                current = current.prev();
            }
            item.setValue(current.getValue());
            if (leftmostParent == item){
                item.setNext(current.next());
            } else {
                leftmostParent.setPrev(current.next());
            }
        }
    }
    @Override
    public void traverse(ListItem root) {
        //Recursive method
        if(root != null){
            traverse(root.prev());
            System.out.println(root.getValue());
            traverse(root.next());
        }

    }
}
