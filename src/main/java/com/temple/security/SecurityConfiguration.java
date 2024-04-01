package com.temple.security;

import static org.springframework.security.config.Customizer.withDefaults;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices.RememberMeTokenAlgorithm;

import com.temple.service.JdbcUserDetailsServices;
import com.temple.service.UserService;

@Configuration
public class SecurityConfiguration {
	@Autowired
	DataSource dataSource;
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	UserService service;
	@Autowired
	com.temple.loginHandler.LoginSuccessHandler handler;
	@Autowired
	JdbcUserDetailsServices detailsServices;
//	

//	@SuppressWarnings("removal")
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http, RememberMeServices rememberMeServices) throws Exception {
		http.authorizeHttpRequests((authorize) -> authorize
				.requestMatchers("/", "/login", "/register", "/register-page", "/css/**", "/images/**",
						"/javascript/**", "/getAllItems")
				.permitAll().requestMatchers("/data").permitAll()
				.requestMatchers("/products", "/pooja-slot", "/darshan-slot", "/products/**", "/book-pooja-slot",
						"/book-darshan-slot", "/submitDonationForm", "/hall-booking", "/book-hall", "/profile",
						"/get/profile", "/updateUser", "/book-artist", "/donate", "/user-cart")
				.hasAnyRole("ADMIN", "USER").requestMatchers("/manager/login", "/admin/**", "/delete-item/**")
				.hasRole("ADMIN").anyRequest().authenticated())
				.formLogin((form) -> form.loginPage("/login").successHandler(handler).permitAll());
		http.rememberMe(
				(remember) -> remember.rememberMeServices(rememberMeServices).key("bala").tokenValiditySeconds(60));

		http.cors(withDefaults()).csrf(csrf -> csrf.disable());

		return http.build();
	}

	@Bean
	RememberMeServices rememberMeServices(UserDetailsService userDetailsService) {
		RememberMeTokenAlgorithm algorithm = RememberMeTokenAlgorithm.SHA256;
		TokenBasedRememberMeServices meServices = new TokenBasedRememberMeServices("bala", detailsServices,
				algorithm);
		meServices.setMatchingAlgorithm(RememberMeTokenAlgorithm.MD5);
		return meServices;
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		
		auth.userDetailsService(detailsServices).passwordEncoder(bCryptPasswordEncoder);
		
//		auth.jdbcAuthentication().dataSource(dataSource)
//				.usersByUsernameQuery("SELECT username, password , is_enabled  FROM devotee WHERE username=?")
//				.authoritiesByUsernameQuery("SELECT username , role FROM devotee WHERE username=?")
//				.passwordEncoder(bCryptPasswordEncoder);
		
	}

}
