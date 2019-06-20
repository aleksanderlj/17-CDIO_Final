package DAL.DAO.ArrayDAO;

import DAL.DAO.IDAO;
import DAL.DTO.User;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserDAO_Array implements IDAO<User> {
    List<User> userList = new ArrayList<>();

    public UserDAO_Array(){
        userList.add(new User(1, "Søren", "SHP", "100496-1897", true));
        userList.add(new User(1, "Martin", "SM", "280888-6271", true));
        userList.add(new User(1, "Nina", "NOM", "050795-2641", true));
    }

    @Override
    public int create(User user) throws DALException, SQLException {
        boolean taken = false;

        for(int n=0 ; n<userList.size() ; n++){
            if (userList.get(n).getId() == user.getId()){
                taken = true;
            }
        }

        if (!taken){
            userList.add(user);
        }else {
            throw new DALException("Error");
        }
        return 0;
    }

    @Override
    public User get(int id) throws DALException, SQLException {
        User user = null;
        for(int n=0 ; n<userList.size() ; n++){
            if (userList.get(n).getId() == id){
                user = userList.get(n);
            }
        }
        return user;
    }

    @Override
    public User[] getList() throws DALException, SQLException {
        return userList.toArray(new User[userList.size()]);
    }

    @Override
    public void update(User user) throws DALException, SQLException {
        for (int n=0 ; n<userList.size() ; n++){
            if (userList.get(n).getId() == user.getId()){
                userList.set(n, user);
            }
        }
    }

    @Override
    public void delete(int id) throws DALException, SQLException {
        for (int n=0 ; n<userList.size() ; n++){
            if (userList.get(n).getId() == id){
                userList.remove(n);
                n--;
            }
        }
    }
}
