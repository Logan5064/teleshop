import psycopg2
import time

def check_auth_activity():
    conn = psycopg2.connect(
        host='ladixoofilad.beget.app', 
        port=5432, 
        database='default_db', 
        user='cloud_user', 
        password='u61e&ke&!Ty1'
    )
    
    cur = conn.cursor()
    
    print("=== MONITORING AUTH ACTIVITY ===")
    print("Waiting for auth codes and sessions...")
    print("(Create a code in @odnorazki_by_bot and login)")
    print("-" * 50)
    
    for i in range(60):  # Monitor for 1 minute
        # Check auth codes
        cur.execute("SELECT COUNT(*) FROM auth_codes WHERE created_at > NOW() - INTERVAL '2 minutes'")
        recent_codes = cur.fetchone()[0]
        
        # Check sessions
        cur.execute("SELECT COUNT(*) FROM user_sessions WHERE created_at > NOW() - INTERVAL '2 minutes'")
        recent_sessions = cur.fetchone()[0]
        
        print(f"[{time.strftime('%H:%M:%S')}] Recent codes: {recent_codes}, Recent sessions: {recent_sessions}")
        
        if recent_codes > 0 or recent_sessions > 0:
            print("\n✅ ACTIVITY DETECTED!")
            
            if recent_codes > 0:
                cur.execute("SELECT code, telegram_id, created_at FROM auth_codes ORDER BY created_at DESC LIMIT 1")
                code_data = cur.fetchone()
                print(f"🔑 Latest code: {code_data[0]} for Telegram {code_data[1]} at {code_data[2]}")
            
            if recent_sessions > 0:
                cur.execute("SELECT session_token, user_id, created_at FROM user_sessions ORDER BY created_at DESC LIMIT 1")
                session_data = cur.fetchone()
                print(f"🎫 Latest session: {session_data[0][:20]}... for User {session_data[1]} at {session_data[2]}")
            
            break
        
        time.sleep(2)
    
    conn.close()

if __name__ == "__main__":
    check_auth_activity() 