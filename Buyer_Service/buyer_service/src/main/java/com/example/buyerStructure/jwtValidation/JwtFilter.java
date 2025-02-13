package com.example.buyerStructure.jwtValidation;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.buyerStructure.configuration.MyUserDetailService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtFilter extends OncePerRequestFilter{
	
	@Autowired
	private JWTServices jwtServices;
	
	@Autowired
	ApplicationContext context;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		System.out.println("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"+request.getRequestURI());
		List<String> urls= new ArrayList<>();
		urls.add("/user/userLogin");
		urls.add("/user/createUser");
		
//		String authHeader=request.getHeader("Authorization");
		String token=null;
		String userName=null;
		String role=null;

		String userId=null;
		
		if(request.getCookies()!=null && !urls.contains(request.getRequestURI())) {
			for(Cookie cookie :request.getCookies()) {
				if(cookie.getName().equals("u_token")) {
					token=cookie.getValue();
					break;
				}
			}
		}
		if(token!=null) {
			
			userName=jwtServices.extractUsername(token);
			
			String[] url=request.getRequestURI().split("/");
			
			userId=url[url.length-1];
			System.err.println("Jwt filter doFilterInternal line 53 : "+Arrays.toString(url));
			role=url[1];
		}

		if(userName !=null && SecurityContextHolder.getContext().getAuthentication()==null) {
			
			UserDetails details= context.getBean(MyUserDetailService.class).loadUserByUsername(role+"-"+userId);
			System.err.println("Jwt filter doFilterInternal(Before validation) line 60 : "+details.toString());
			System.err.println("Jwt filter doFilterInternal(Before validation) line 61 : "+token);
			if(jwtServices.validateToken(token, details.getUsername())) {
				System.err.println("Jwt filter doFilterInternal(After validation) line 63 : "+userName+"  =  "+details.getAuthorities());
				UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(details,null,details.getAuthorities());
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		}

		filterChain.doFilter(request, response);
	}

}
