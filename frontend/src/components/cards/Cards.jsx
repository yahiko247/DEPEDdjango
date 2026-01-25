import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000" 
          alt="Lesson Plan"
      
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           My lesson Plan
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            View You're Lesson Quarterly
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
