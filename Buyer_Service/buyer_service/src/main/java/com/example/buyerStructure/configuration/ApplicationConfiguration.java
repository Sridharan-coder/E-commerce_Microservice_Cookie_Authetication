package com.example.buyerStructure.configuration;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.buyerStructure.jwtValidation.JwtFilter;



@Configuration
@EnableWebSecurity
public class ApplicationConfiguration {

	private final MyUserDetailService userDetailsService;

	@Autowired
	private JwtFilter jwtFilter;

	public ApplicationConfiguration(MyUserDetailService userDetailsService) {

		this.userDetailsService = userDetailsService;
	}
	
	// this corsConfiguration method is used to prevent the cors error with cookies.
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
    	CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:3002")); //  Set allowed frontend URLs
        configuration.setAllowedHeaders(List.of("*")); //  Allow all headers
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE")); //  Allow necessary methods
        configuration.setAllowCredentials(true); //  Required for cookies to work
        configuration.setExposedHeaders(List.of("Set-Cookie"));
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	} 

    // securityFilterChain method is used to follow up the validation chain flow path.
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) {

		try {

//			http.csrf(customizer -> customizer.disable());
//			http.authorizeHttpRequests(request -> request.anyRequest().authenticated());
////			http.formLogin(Customizer.withDefaults());
//			http.httpBasic(Customizer.withDefaults());
//			http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

//			return http.build();

			return http.csrf(customizer -> customizer.disable()).authorizeHttpRequests(request -> request
					.requestMatchers("/user/userLogin", "/user/createUser","/user/userLogout")
					.permitAll().anyRequest().authenticated())
//					.formLogin(Customizer.withDefaults())
//					.httpBasic(Customizer.withDefaults())
					.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
					.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
					.cors(cors -> cors.configurationSource(corsConfigurationSource())).build();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	
	@Bean
	AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
		provider.setUserDetailsService(userDetailsService);
		System.out.println("line : 84 apllication configuration : "+provider.toString());
		return provider;
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		System.out.println("line : 90 apllication configuration : "+config.toString());
		return config.getAuthenticationManager();
	}

}
