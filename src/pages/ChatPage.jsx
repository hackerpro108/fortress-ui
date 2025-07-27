const postChatMessage = async (message) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4ifQ.7SVAsxCAkUts0fSVAAbOiQgfj61i59Yjhi7xVBFAZ7g";

  // URL mới, an toàn và chuyên nghiệp
  const res = await fetch('https://status.lohi.io.vn/api/myiu/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to get response from AI');
  }

  return res.json();
};