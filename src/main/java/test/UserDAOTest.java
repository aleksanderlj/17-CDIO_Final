import DAL.DAO.IDAO;
import java.sql.SQLException;
import DAL.DAO.UserDAO;
import DAL.DTO.User;
import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class UserDAOTest {
    private UserDAO userDAO = new UserDAO();
    private User user = new User();
    private User recivedUser = new User();

    @Test
    public void createTest() throws IDAO.DALException, SQLException {
        // Fjerner user med dette id
        userDAO.delete(7545);

        // Tester create

        user.setNavn("SørenBobo");
        user.setId(7545);
        user.setIni("SB");
        user.setCpr("061199-4269");
        user.setAktiv(true);
        userDAO.create(user);

        recivedUser = userDAO.get(7545);
        assertEquals(user.getId(), recivedUser.getId());
        assertEquals(user.getNavn(), recivedUser.getNavn());
        assertEquals(user.getIni(), recivedUser.getIni());
        assertEquals(user.getCpr(), recivedUser.getCpr());
        assertEquals(user.isAktiv(), recivedUser.isAktiv());

        // Tester Update
        user.setNavn("SørenBob");
        user.setCpr("071199-4397");
        user.setAktiv(false);
        user.setIni("SBO");
        userDAO.update(user);

        recivedUser = userDAO.get(7545);
        assertEquals(user.getId(), recivedUser.getId());
        assertEquals(user.getNavn(), recivedUser.getNavn());
        assertEquals(user.getIni(), recivedUser.getIni());
        assertEquals(user.getCpr(), recivedUser.getCpr());
        assertEquals(user.isAktiv(), recivedUser.isAktiv());

        // Tester getlist metoden
        User[] userList = userDAO.getList();

        assertEquals(userList[0].getNavn(), "Simon");
        assertEquals(userList[1].getNavn(), "Silas");
        assertEquals(userList[2].getNavn(), "Peter");


        // Sletter objektet fra database
        userDAO.delete(7545);
    }
}
