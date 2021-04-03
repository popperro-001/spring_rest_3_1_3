package com.example.spring_rest_3_1_3.repository;

import com.example.spring_rest_3_1_3.entity.Role;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
public class RoleDaoImpl implements RoleDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Role getRoleByName(String name) {
        TypedQuery<Role> role = entityManager.createQuery("from Role R where R.name = :name", Role.class);
        role.setParameter("name", name);
        return role.getSingleResult();
    }

    @Override
    public List<Role> allRoles() {
        return entityManager.createQuery("from Role").getResultList();
    }
}
