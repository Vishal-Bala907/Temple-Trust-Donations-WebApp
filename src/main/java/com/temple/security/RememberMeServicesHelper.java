//package com.temple.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.ProviderManager;
//import org.springframework.security.authentication.RememberMeAuthenticationProvider;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.authentication.rememberme.RememberMeAuthenticationFilter;
//import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;
//
////@Component
////@Component
//@Configuration
//public class RememberMeServicesHelper {
//	@Autowired
//	UserDetailsService userDetailsService;
//	@Autowired
//	BCryptPasswordEncoder bCryptPasswordEncoder;
////	@Autowired 
////	AuthenticationManager authenticationManager;
//	
//	@Bean
//	RememberMeAuthenticationFilter rememberMeAuthenticationFilter() {
//		RememberMeAuthenticationFilter rememberMeAuthenticationFilter = new 
//				RememberMeAuthenticationFilter(authenticationManager(userDetailsService,
//						bCryptPasswordEncoder), tokenBasedRememberMeServices());
//		return rememberMeAuthenticationFilter;
//	}
//	
//	@Bean
//	AuthenticationManager authenticationManager(UserDetailsService detailsService , PasswordEncoder encoder) {
//		DaoAuthenticationProvider authenticationProvider = 
//				new DaoAuthenticationProvider();
//		authenticationProvider.setPasswordEncoder(encoder);
//		authenticationProvider.setUserDetailsService(detailsService);
//		return new ProviderManager(authenticationProvider);
//		
//	}
//	
//	@Bean
//	TokenBasedRememberMeServices tokenBasedRememberMeServices() {
//		TokenBasedRememberMeServices tokenBasedRememberMeServices = new 
//				TokenBasedRememberMeServices("bala", userDetailsService);
//		return tokenBasedRememberMeServices;
//	}
//	
//	@Bean
//	RememberMeAuthenticationProvider rememberMeAuthenticationProvider() {
//		RememberMeAuthenticationProvider rememberMeAuthenticationProvider = new 
//				RememberMeAuthenticationProvider("bala");
//		return rememberMeAuthenticationProvider;
//	}
//}
