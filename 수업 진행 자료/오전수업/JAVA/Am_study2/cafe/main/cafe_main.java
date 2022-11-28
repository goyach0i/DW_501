package cafe.main;

import java.util.InputMismatchException;
import java.util.Scanner;

import cafe.VO.member;
import cafe.control.event;
import cafe.control.exit;
import cafe.control.login;
import cafe.control.menu_able;
import cafe.control.order;
import cafe.control.signin;

public class cafe_main {
	static Scanner sc = new Scanner(System.in);
	public static member user = null;

	public static void main(String[] args) {

		menu_able[] menu = { new order(), new login(), new event(), new signin(), new exit() };

		while (menu[main_menu() - 1].menu_active());
	}
	// 반복문 사용하지 않고 반복문 처럼 동작하게..
	public static int main_menu() { // 클래스 메서드 - 클래스 메서드에서만 사용
		int select = 0;
		
		String[] menu = {"주문", "로그인", "이벤트", "회원가입", "종료"};
			try {
				for(int i = 1; i <= menu.length; i++){
					if(user != null && ( i==2 || i==4 ) )
						continue;
					System.out.println(i + ". " + menu[i-1]);
					
				}
				
				System.out.println("선택 : ");
				select = sc.nextInt();
				if(select<1 || select>5)
					throw new InputMismatchException("잘못입력했습니다.");
			}catch(Exception e) {
				System.out.println( e.getMessage() );
				sc.nextLine(); // 재기호출 - 자기자신을 호출
				select = main_menu();
			}
			return select;
	}
}

/*
 	키보드 입력 과정
 	
 	키보드 입력
 */





