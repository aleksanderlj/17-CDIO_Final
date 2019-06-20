import DAL.DAO.IDAO;
import java.sql.SQLException;
import DAL.DAO.UserDAO;
import DAL.DTO.User;
import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class UserDAOTest {
    // Definere test objekter
    private UserDAO userDAO = new UserDAO();
    private User user = new User(-1, "SørenBobo", "SB", "061199-4269", true);
    private User recivedUser = new User();

    // Husk at delete brugeren med id -1 før hver test i workbench.
    @Test
    public void createTest() throws IDAO.DALException, SQLException {
        // Laver brugeren, og henter den oprettede bruger fra databasen.
        userDAO.create(user);
        recivedUser = userDAO.get(-1);
        assertEquals(recivedUser.getId(), user.getId());
        assertEquals(recivedUser.getNavn(), user.getNavn());
        assertEquals(recivedUser.getIni(), user.getIni());
        assertEquals(recivedUser.getCpr(), user.getCpr());
        assertEquals(recivedUser.isAktiv(),user.isAktiv());
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
        recivedUser = userDAO.get(-1);

        assertEquals(recivedUser.getId(), user.getId());
        assertEquals(recivedUser.getNavn(), user.getNavn());
        assertEquals(recivedUser.getIni(), user.getIni());
        assertEquals(recivedUser.getCpr(), user.getCpr());
        assertEquals(recivedUser.isAktiv(),user.isAktiv());
    }

    @Test
    public void getListTest() throws SQLException, IDAO.DALException {
        // Henter listen af brugere, og tjekker om de rigtige test bruger er blevet hentet.
        User[] userList = userDAO.getList();
        assertEquals("Simon", userList[0].getNavn());
        assertEquals("Silas", userList[1].getNavn());
        assertEquals("Peter", userList[2].getNavn());
    }

    @Test
    public void deleteTest() throws SQLException, IDAO.DALException {
        // Indsætter brugeren, og kalder delete, for aat se at statusen opdateres.
        user.setAktiv(true);
        userDAO.create(user);
        userDAO.delete(-1);
        assertEquals(!user.isAktiv(), userDAO.get(-1).isAktiv());
        userDAO.delete(-1);
        assertEquals(user.isAktiv(), userDAO.get(-1).isAktiv());
    }
}
