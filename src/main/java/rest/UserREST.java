package rest;

import DAL.DAO.IDAO;
import DAL.DAO.UserDAO;
import DAL.DTO.User;

import javax.ws.rs.*;
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

    @GET
    @Path("getuser/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public User getUser(@PathParam("id") String id) throws SQLException, IDAO.DALException {
        return db.get(Integer.parseInt(id));
    }
}
