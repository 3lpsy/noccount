"""create targets table

Revision ID: 78a83f3f43ac
Revises:
Create Date: 2017-02-24 16:36:18.186777

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '78a83f3f43ac'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'targets',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('message_id', sa.Integer, primary_key=True),
        sa.Column('to', sa.Text, nullable=False),
        sa.Column('from', sa.Text, nullable=False),
        sa.Column('subject', sa.Text, nullable=False),
        sa.Column('message', sa.Text, nullable=False),
        sa.Column('url', sa.Text, nullable=False),
        sa.Column('is_valid', sa.Boolean, nullable=False),
        sa.Column('is_deleted', sa.Boolean, nullable=False),
        sa.Column('is_queued', sa.Boolean, nullable=False)
    )

def downgrade():
    op.drop_table('targets')
