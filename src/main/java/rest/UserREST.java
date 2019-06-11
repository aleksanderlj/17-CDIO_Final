package rest;

import DAL.DAO.IDAO;
import DAL.DAO.UserDAO;
import DAL.DTO.User;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;

@Path("user")
public class UserREST {
    private IDAO<User> db = new UserDAO();

    @POST
    @Path("create")
    @Consumes(MediaType.APPLICATION_JSON)
    public String createUser(User user) throws SQLException, IDAO.DALException {
        return Integer.toString(db.create(user));
    }
}
