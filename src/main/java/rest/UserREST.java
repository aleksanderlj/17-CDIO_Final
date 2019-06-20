package rest;

import DAL.DAO.IDAO;
import DAL.DAO.UserDAO;
import DAL.DTO.User;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.SQLException;

@Path("user")
public class UserREST {
    private IDAO<User> db = new UserDAO();

    @POST
    @Path("create")
    @Consumes(MediaType.APPLICATION_JSON)
    public String createUser(User user) throws SQLException, IDAO.DALException {
        String eString = "1";

        try {
            db.create(user);
        } catch (Exception e){
            eString = "-1";
        }
        return eString;
    }

    @GET
    @Path("get/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public User getUser(@PathParam("id") String id) throws SQLException, IDAO.DALException {
        return db.get(Integer.parseInt(id));
    }

    @POST
    @Path("delete/{id}")
    public void deleteUser(@PathParam("id") String id) throws SQLException, IDAO.DALException {
        db.delete(Integer.parseInt(id));
    }

    @POST
    @Path("update")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateUser(User user) throws SQLException, IDAO.DALException {
        db.update(user);
    }

    @GET
    @Path("list")
    public User[] getUserlist() throws SQLException, IDAO.DALException {
        return db.getList();
    }
}
