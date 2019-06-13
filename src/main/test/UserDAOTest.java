import DAL.DAO.IDAO;
import java.sql.SQLException;
import DAL.DAO.UserDAO;
import DAL.DTO.User;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class UserDAOTest {
    // Definere test objekter
    private UserDAO userDAO = new UserDAO();
    private User user = new User(7545, "SørenBobo", "SB", "061199-4269", true);
    private User recivedUser = new User();

    // Husk at delete brugeren med id 7545 før hver test i workbench.
    @Test
    public void createTest() throws IDAO.DALException, SQLException {
        // Laver brugeren, og henter den oprettede bruger fra databasen.
        userDAO.create(user);
        recivedUser = userDAO.get(7545);
        assertEquals(user.getId(), recivedUser.getId());
        assertEquals(user.getNavn(), recivedUser.getNavn());
        assertEquals(user.getIni(), recivedUser.getIni());
        assertEquals(user.getCpr(), recivedUser.getCpr());
        assertEquals(user.isAktiv(), recivedUser.isAktiv());
    }

    @Test
    public void updateTest() throws SQLException, IDAO.DALException {
        // Opretter obejktet i databasen, og opdaterer derefter variablerne i java objektet.
        userDAO.create(user);
        user.setNavn("SørenBob");
        user.setCpr("071199-4397");
        user.setAktiv(false);
        user.setIni("SBO");
        // Opdatere objektet i databasen, og sammenligner.
        userDAO.update(user);
        recivedUser = userDAO.get(7545);
        assertEquals(user.getId(), recivedUser.getId());
        assertEquals(user.getNavn(), recivedUser.getNavn());
        assertEquals(user.getIni(), recivedUser.getIni());
        assertEquals(user.getCpr(), recivedUser.getCpr());
        assertEquals(user.isAktiv(), recivedUser.isAktiv());
    }

    @Test
    public void getListTest() throws SQLException, IDAO.DALException {
        // Henter listen af brugere, og tjekker om de rigtige test bruger er blevet hentet.
        User[] userList = userDAO.getList();
        assertEquals(userList[1].getNavn(), "Simon");
        assertEquals(userList[2].getNavn(), "Silas");
        assertEquals(userList[3].getNavn(), "Peter");
    }

    @Test
    public void deleteTest() throws SQLException, IDAO.DALException {
        // Indsætter brugeren, og kalder delete, for aat se at statusen opdateres.
        user.setAktiv(true);
        userDAO.create(user);
        userDAO.delete(7545);
        assertEquals(!user.isAktiv(), userDAO.get(7545).isAktiv());
        userDAO.delete(7545);
        assertEquals(user.isAktiv(), userDAO.get(7545).isAktiv());
    }
}
