package com.joshua.books.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.joshua.books.domain.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

	@Query("FROM Role r " + "WHERE r not in :lista")
	List<Role> notRegistered(@Param("lista") List<Role> lista);

}
